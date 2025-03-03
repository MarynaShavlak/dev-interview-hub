import { v4 } from 'uuid';
import {
    FirebaseStorage,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

export const uploadImage = async (
    file: File,
    folder: string,
    firebaseStorage: FirebaseStorage,
) => {
    const safeFileName = encodeURIComponent(file.name);
    const uniqueFilePath = `images/${folder}/${safeFileName}_${v4()}`;
    const imageRef = ref(firebaseStorage, uniqueFilePath);
    const uploadResult = await uploadBytes(imageRef, file);
    const { fullPath } = uploadResult.metadata;
    const pathReference = ref(firebaseStorage, fullPath);
    return getDownloadURL(pathReference);
};
