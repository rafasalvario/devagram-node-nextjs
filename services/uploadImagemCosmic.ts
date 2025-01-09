import multer from "multer";
import cosmicjs from "cosmicjs"; 

const {BUCKET_SLUG, READ_KEY, WRITE_KEY,} = process.env;

const Cosmicjs = cosmicjs (); 

const bucketSlug = Cosmicjs.bucket({
    slug: BUCKET_SLUG,
    write_key: WRITE_KEY    
});

const storage = multer.memoryStorage ();
const upload = multer({storage : storage}); 

const uploadImagemCosmic = async (req : any) => {
    if(req?.file?.originalname){
        
        const media_object = {
        originalName : req.file.originalName,
        buffer : req.file.buffer
    };  

    if (req.url && req.url.includes ('publicacao')){
        return await bucketSlug.addMedia ({media: media_object}); 
        }
    }

}
export {upload, uploadImagemCosmic}; 


