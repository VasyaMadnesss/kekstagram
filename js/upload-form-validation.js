const COMMENT_MAX_LENGTH = 140;
const MAX_HASHTAGS = 5;

const setupValidation = (form, hashtagsField, commentsField, pristine) => {

  const hasUniqueHashtags = (hashtagsArray) => {
    const hashtagsCopy = hashtagsArray.slice();
    for (let i = 0; i < hashtagsCopy.length; i++) {
      hashtagsCopy.splice(i, 1);
      if (hashtagsCopy.map((item)=>item.toLowerCase()).includes(hashtagsArray[i].toLowerCase())) {
        return false;
      } else {
        hashtagsCopy.splice(i, 0, hashtagsArray[i]);
      }
    }
    return true;
  };

  const validateHashtags = (value) => {
    if (!value) {
      return true;
    }
    const hashtags = value.trim().split(' ');
    const hashtagRule = /^#[a-zа-яё0-9]{1,19}$/i;
    if (hashtags.length <= MAX_HASHTAGS && hasUniqueHashtags(hashtags) && hashtags.every((item) => hashtagRule.test(item))) {
      return true;
    }
    return false;
  };

  const getHashtagsErrorMessage = () => {
    const hashtags = hashtagsField.value.trim().split(' ');
    const hashtagRule = /^#[a-zа-яё0-9]{1,19}$/i;
    switch (false) {
      case (hashtags.every((item) => hashtagRule.test(item))):
        return 'Введён невалидный хэштег.';
      case (hasUniqueHashtags(hashtags)):
        return 'Хэштеги повторяются.';
      case (hashtags.length <= MAX_HASHTAGS):
        return 'Превышено количество хэштегов.';
    }
  };

  const validateComment = (value) => (value.length <= COMMENT_MAX_LENGTH);
  const getCommentsErrorMessage = () => 'Максимальная длина комментария 140 символов';

  pristine.addValidator(
    hashtagsField,
    validateHashtags,
    getHashtagsErrorMessage
  );

  pristine.addValidator(
    commentsField,
    validateComment,
    getCommentsErrorMessage()
  );

};

export { setupValidation };
