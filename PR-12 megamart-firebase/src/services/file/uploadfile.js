import axios from "axios";

const uploadImage = async(fileData) => {

    let imageData = new FormData();

    imageData.append('file', fileData);
    imageData.append('upload_preset', 'product');
    imageData.append('cloude_name', 'dheweokqn');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dheweokqn/image/upload`, imageData)
    return res.data.secure_url;

}


export default uploadImage;