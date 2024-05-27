export default class Dialogue{
    constructor({
        welcome = "Welcome",
        playerOptions = {
            option1: "Option 1",
            option2: "Option 2",
            option3: "Option 3",
            option4: "Option 4",
        },
        responses = {
            one: "Response 1",
            two: "Response 2",
            three: "Response 3",
            four: "Response 4",
        },
        iframeAddress = null,
        showIframeOn = 0,
    })
    {
        this.welcome = welcome;
        this.playerOptions = playerOptions;
        this.responses = responses;
        this.iframeAddress = iframeAddress;
        this.showIframeOn = showIframeOn;
    }
}