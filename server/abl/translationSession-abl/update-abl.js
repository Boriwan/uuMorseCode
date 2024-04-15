const TranslationSessionDao = require("../../dao/translationSession-dao");

let dao = new TranslationSessionDao();

async function UpdateAbl(req, res) {
    const translationSessionId = req.params.id;

    try {
        const translationSession = await dao.get(translationSessionId);
        if (!translationSession) {
            return res.status(404).json({ error: "Translation session not found" });
        }

        // Check if the logged-in user is the author of the translation session
        if (translationSession.authorID !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Perform the update with the new data from req.body
        const updatedTranslationSession = await dao.update(translationSessionId, req.body);
        res.json(updatedTranslationSession);
    } catch (error) {
        console.error("Error updating translation session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = UpdateAbl;
