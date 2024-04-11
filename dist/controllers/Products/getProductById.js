import Product from "../../models/Product.js";
export const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const FoundProduct = await Product.findOne({ _id: id });
        if (FoundProduct) {
            res.status(200).json({
                status: true,
                message: FoundProduct,
            });
        }
        else {
            res.status(401).json({
                status: false,
                message: "This Product does not exist",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};
