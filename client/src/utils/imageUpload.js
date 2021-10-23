export const imageUpload = async (images) => {
    let imgArr = []
    for(const item of images){
        const formData = new FormData()

        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }

        formData.append("upload_preset", "nccmkvlk")
        formData.append("cloud_name", "dx2vkbh4r")

        const res = await fetch("https://api.cloudinary.com/v1_1/dx2vkbh4r/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url});
    }
    return imgArr;
}