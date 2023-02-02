import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./firebase";

class API {
	addImage(Image, id) {
		return new Promise(async (res, rej) => {
			const storageRef = ref(storage, `files/Products/${id}/DefaultImage`);
			const uploadTask = uploadBytesResumable(storageRef, Image);
			try {
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						);
						return progress;
					},
					(error) => {
						alert(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							res(downloadURL);
						});
					}
				);
			} catch (error) {
				rej("");
			}
		});
	}

	addProduct(data, Image) {
		return new Promise(async (res, rej) => {
			try {
				const colRef = collection(db, "Products");
				const docRef = await addDoc(colRef, data);
				if (Image) {
					const DocID = (await getDoc(docRef)).id;
					await this.setProductImageValue(
						DocID,
						await this.addImage(Image, DocID)
					);
				}
				res(true);
			} catch (error) {
				console.log(error);
				rej(false);
			}
		});
	}

	deleteProduct(id) {
		return new Promise(async (res, rej) => {
			try {
				this.updateProduct(id, { status: "deleted" });
				res(true);
			} catch (error) {
				console.log(error);
				rej(error.message);
			}
		});
	}

	setProductImageValue(id, imageValue) {
		return new Promise(async (res, rej) => {
			try {
				const docRef = doc(db, "Products", id);
				await setDoc(
					docRef,
					{
						image: imageValue,
					},
					{ merge: true }
				);
				res(true);
			} catch (error) {
				console.log(error);
				rej(error.message);
			}
		});
	}

	updateProduct(id, data, Image) {
		return new Promise(async (res, rej) => {
			try {
				const docRef = doc(db, "Products", id);
				await setDoc(
					docRef,
					{
						...data,
					},
					{ merge: true }
				);
				if (Image) {
					await this.setProductImageValue(id, await this.addImage(Image, id));
				}
				res(true);
			} catch (error) {
				console.log(error);
				rej(error.message);
			}
		});
	}

	getProduct(id) {
		return new Promise(async (res, rej) => {
			try {
				const docRef = doc(db, "Products", id);
				const data = await getDoc(docRef);
				if (data.exists()) {
					res(data.data());
				}
				rej(`id:${id} Product not exist`);
			} catch (error) {
				console.log(error);
				rej(error.message);
			}
		});
	}

	getProducts() {
		return new Promise(async (res, rej) => {
			try {
				const colRef = collection(db, "Products");
				const data = await getDocs(colRef);
				res(data.docs.map((x) => ({ ...x.data(), id: x.id })));
			} catch (error) {
				console.log(error);
				rej(error.message);
			}
		});
	}
}

export default new API();
