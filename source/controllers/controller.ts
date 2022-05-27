import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import bcryptjs, { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import Profile from "../models/profile"
import Document from '../models/document';
import signJWT from '../functions/signJWT';
import { userExists } from '../functions/checks';
import Stripe from 'stripe';
import config from '../config/config';
const stripe = new Stripe(config.stripe.secret_key,{"apiVersion":"2020-08-27"})

const NAMESPACE = "Users"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user authorized")

    return res.status(200).json({
        message: "Authorized",
        test: res.locals.jwt
    });
};

const upgrade = async(req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;

    try{
        const paymentIntent = await stripe.paymentIntents.create
        ({
            amount: 1099,
            currency: "usd",
            payment_method_types: ["card"]
        })

        const clientSecret = paymentIntent.client_secret;
        await User.findOneAndUpdate({username},{subscription: "paid"})
        return res.status(200).json({
            clientSecret: clientSecret,
        });
    }catch(e){
        console.log(e.message)
        return res.status(404).json({
            error: e.message,
        });
    }

};

const register = async(req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    if(await userExists(username)){
        return res.status(404).json({
            message: "User already exists"
        })
    }
    
    bcryptjs.hash(password, 10, (hashError, hash)=>{
        if(hashError){
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }



        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash
        });

        return _user.save()
        .then(user => {
            return res.status(201).json({
                user
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error: error
            })
        })
    })

};
const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users) => {
            
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                console.log(password)
                console.log(result)
                console.log(users[0].password)
                if (!result) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            return res.status(500).json({
                                message: _error.message,
                                error: _error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Auth successful',
                                token: token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
    .select('-password')
    .exec()
    .then(users=>{
        return res.status(200).json({
            users,
            count: users.length
        })
    })

};

const createProfile = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    let {name, characters} = req.body
    Profile.find({username})
    .exec()
    .then(async(profiles)=>{
        let user = await User.findOne({username}).exec()
        //If user doesn't exist anymore
        if(user == null){
            return res.status(404).json({
                message: "Account doesn't exist anymore.",
            })
        }
        //If user subscription is free and has one profile
        if(user.subscription==="free" && profiles.length>0){
            return res.status(404).json({
                message: "You can't create more than 1 profile on a 'free' account.",
                user: user.subscription
            })
        }

        const _profile = new Profile({
            _id: new mongoose.Types.ObjectId(),
            username,
            name: name,
            characters: characters
        });

        return _profile.save()
        .then(profile => {
            return res.status(201).json({
                profile
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error: error
            })
        })

    })

}

const getProfiles = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;

    Profile.find({username})
    .exec()
    .then(profiles => {
        return res.status(201).json({
            profiles: profiles,
            count: profiles.length
        })
    })


}

const updateProfile = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    let {_id, name, characters} = req.body;

    Profile.findOneAndUpdate({username: username, _id: _id},{name: name, characters: characters}, {new:true})
    .then(profile => {

        //If user doesn't exist anymore
        if(profile == null){
            return res.status(404).json({
                message: "Profile doesn't exist anymore.",
            })
        }

        return res.status(200).json({
            profile
        })
    })
    .catch(error => {
            return res.status(500).json({
                message: error.message,
                error: error
            })
        })

}

const deleteProfile = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    let {_id} = req.body;

    // Profile.findOneAndUpdate({username: username, _id: _id},{name: name, characters: characters})
    Profile.findByIdAndRemove(_id)
    .then(profile => {

        //If user doesn't exist anymore
        if(profile == null){
            return res.status(404).json({
                message: "Profile doesn't exist anymore.",
            })
        }

        return res.status(200).json({
            profile
        })
    })
    .catch(error => {
            return res.status(500).json({
                message: error.message,
                error: error
            })
        })

}

const createDocument = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    //TODO Use Effective Date
    let {profile_id, name, collectionIndex,  effective_date, img_base64} = req.body

    //base64 to img
    var base64Data = img_base64.replace(/^data:image\/png;base64,/, "");

    const _id = new mongoose.Types.ObjectId();
    const img_url = "C:/xampp/htdocs/imgs/"+_id+".png"
    const document_img_url=_id+".png"
    require("fs").writeFile(img_url, base64Data, 'base64', function(err: any) {
        console.log(err);
    });

    const _document = new Document({
        _id: _id,
        username,
        profile_id: profile_id,
        name: name,
        collectionIndex: collectionIndex,
        effective_date: new Date(effective_date),
        img_url: document_img_url
    })

    return _document.save()
    .then(document => {
        return res.status(201).json({
            document
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message,
            error: error
        })
    })

}

const getDocuments = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    let {profile_id} = req.query

    Document.find({profile_id})
    .exec()
    .then(documents => {
        return res.status(201).json({
            documents: documents,
            count: documents.length
        })
    })


}

const updateDocument = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    let {_id, profile_id, name, collectionIndex,  effective_date, img_base64} = req.body

//base64 to img
    let old_id = _id
    const img_url = "C:/xampp/htdocs/imgs/"+_id+".png"
    if(img_base64!="none"){
        console.log("none")
    var base64Data = img_base64.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile(img_url, base64Data, 'base64', function(err: any) {
        console.log(err);
    });
}

    Document.findOneAndUpdate({username: username, _id: _id},
        {
            profile_id: profile_id,
            name: name, 
            collectionIndex: collectionIndex,
            effective_date: effective_date,
            img_url: old_id+".png"

        }, {new:true})
    .then(document => {

        //If user doesn't exist anymore
        if(document == null){
            return res.status(404).json({
                message: "Document doesn't exist anymore.",
            })
        }

        return res.status(200).json({
            document
        })
    })
    .catch(error => {
            return res.status(500).json({
                message: error.message,
                error: error
            })
        })

}

const deleteDocument = (req: Request, res: Response, next: NextFunction) => {
    let {username} = res.locals.jwt;
    let {_id} = req.body;

    // Profile.findOneAndUpdate({username: username, _id: _id},{name: name, characters: characters})
    Document.findByIdAndRemove(_id)
    .then(document => {

        //If user doesn't exist anymore
        if(document == null){
            return res.status(404).json({
                message: "Document doesn't exist anymore.",
            })
        }

        const img_url = "C:/xampp/htdocs/imgs/"+_id+".png"
        const fs = require("fs")
        fs.unlinkSync(img_url)

        return res.status(200).json({
            document
        })
    })
    .catch(error => {
            return res.status(500).json({
                message: error.message,
                error: error
            })
        })

}

export default { validateToken, register, login, getAllUsers, createProfile, getProfiles, updateProfile, deleteProfile, createDocument, getDocuments, updateDocument, deleteDocument, upgrade };
