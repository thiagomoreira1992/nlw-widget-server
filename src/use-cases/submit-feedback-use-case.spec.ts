import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy}
)

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png:base64,diuahsiuahsdiaousdhasiu',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
    
    it('should NOT be able to submit a feedback without a type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png:base64,diuahsiuahsdiaousdhasiu',
        })).rejects.toThrow();
    });

    it('should NOT be able to submit a feedback without a comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png:base64,diuahsiuahsdiaousdhasiu',
        })).rejects.toThrow();
    });

    it('should NOT be able to submit a feedback with a invalid screenshot', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'dteste.jpg',
        })).rejects.toThrow();
    });


});