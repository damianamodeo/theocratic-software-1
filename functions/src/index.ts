import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const setRoles = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin
        .auth()
        .setCustomUserClaims(user.uid, { ...user.customClaims, [context.auth.uid]:{email: data.email , clam: true}});
    })
    .then(() => {
      return { message: `Success? ${data.email} has been made an admin` };
    })
    .catch((err) => {
      return err.message;
    });
});

export const newUserSignUp = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ email: user.email });
});

export const userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});
