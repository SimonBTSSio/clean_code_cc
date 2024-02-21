const { Op } = require("sequelize");

module.exports = function CardController(CardService) {
    return {
        quizz: async (req, res) => {
            try {
                const date = req.query.date || new Date();
                const startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);

                const cards = await CardService.findAll({
                    createdAt: {
                        [Op.gte]: startOfDay,
                        [Op.lte]: endOfDay
                    }
                });

                res.json(cards);
            } catch (error) {
                res.status(500).send(error.message);
            }
        },
        answerCard: async (req, res) => {
            try {
                const cardId = req.params.cardId;
                const { isValid } = req.body;

                const card = await CardService.findOne({ id: cardId });
                if (!card) {
                    return res.status(404).send('Card not found');
                }

                let newCategory;
                if (isValid) {
                    newCategory = card.category === 'SEVENTH' ? 'DONE' : CardService.getNextCategory(card.category);
                } else {
                    newCategory = 'FIRST';
                }

                await CardService.update({ id: cardId }, { category: newCategory });

                res.status(204).send();
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.status(400).send(error.message);
                }
                res.status(500).send(error.message);
            }
        }
    }
};
