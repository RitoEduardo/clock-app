class ValidateModel {
    static hour(value) {
        if (value != NaN && value >= 0 && value < 23) {
            return true;
        }
        return false;
    }

    static minute(value) {
        if (value != NaN && value >= 0 && value < 60) {
            return true;
        }
        return false;
    }
}

module.exports = ValidateModel;