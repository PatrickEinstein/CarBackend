import Product from "../../models/Product.js";
export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const foundProduct = await Product.findByIdAndDelete({ _id: id });
        if (foundProduct) {
            res.status(200).json({
                status: true,
                message: foundProduct.name,
            });
        }
        else {
            res.status(401).json({
                status: false,
                message: "This product does not exist",
            });
        }
    }
    catch (err) {
        res.status(401).json({
            status: false,
            message: err.message,
        });
    }
};
