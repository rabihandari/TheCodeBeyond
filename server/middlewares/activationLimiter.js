import rateLimit from 'express-rate-limit';

export const activationLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3,
    handler: function (req, res, /*next*/) {
        res.status(429).json({ message: "You cannot send more emails. Please wait at least 5 minutes to send another email" });
    },
});
