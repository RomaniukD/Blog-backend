import { validationResult} from 'express-validator';

export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({message: "An error occurred"});
    }

    next();
}
