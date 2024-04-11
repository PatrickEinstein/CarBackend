import Product from "../../models/Product.js";
import uploadResources from "../../config/Cloudinary.js";
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(`req::`, req.params);
        const { name, price, location, description, category } = req.body;
        const FoundProduct = await Product.findOne({ _id: id });
        if (FoundProduct) {
            const [Image, Video] = await Promise.all([
                req.files[0] && uploadResources(req.files[0].path, "ProductImage"),
                req.files[1] && uploadResources(req.files[1].path, "ProductVideo"),
            ]);
            FoundProduct.name = name || FoundProduct.name;
            FoundProduct.description = description || FoundProduct.description;
            FoundProduct.Image = Image || FoundProduct.Image;
            FoundProduct.Video = Video || FoundProduct.Video;
            FoundProduct.price = price || FoundProduct.price;
            FoundProduct.location = location || FoundProduct.location;
            FoundProduct.category = category || FoundProduct.category;
            FoundProduct.save();
            return res.status(200).json({
                status: true,
                message: FoundProduct,
            });
        }
        else {
            return res.status(404).json({
                status: false,
                message: "This Product could not be found",
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message,
        });
    }
};
