const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addResponse,
    removeResponse,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/responses').post(addResponse);

router.route('/:thoughtId/responses/:responseId').delete(removeResponse);

module.exports = router;