import Product from "../../models/Product.js";
export const getAllProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.params.page, 10) || 1;
        const pageSize = parseInt(req.params.pageSize, 10) || 10;
        const skip = (page - 1) * pageSize;
        const allProducts = await Product.find({})
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            message: allProducts,
        });
    }
    catch (e) {
        res.status(200).json({
            status: false,
            message: e.message,
        });
    }
};
