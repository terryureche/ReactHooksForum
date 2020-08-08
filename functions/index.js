const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/linksPagination?offset=?
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const LINKS_PER_PAGE = 3;

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://react-hooks-7719b.firebaseio.com"
});

const db = admin.firestore();

exports.linkPagination = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*");
    let linksRef = db.collection("links");
    const offset = Number(request.query.offset);
    linksRef
        .orderBy("created", "desc")
        .limit(LINKS_PER_PAGE)
        .offset(offset)
        .get()
        .then(snapshot => {
            const links = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            response.json(links);
        })
});
