describe("Hello World Suite", function() {
    it("check if text is 'Hello World'", function(done) {
        let text = "Hello World";
        expect(text).toBe("Hello World");
        done();
    });
   it("check if another text is 'Hello World'", function(done) {
        let text = "Not Hello World";
        expect(text).toBe("Hello World");
        done();
    });
});
