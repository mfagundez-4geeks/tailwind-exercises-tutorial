const fs=require("fs");
const path=require("path");
const html=fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

jest.dontMock("fs");

describe("All the tests should pass", function () {
    beforeEach(() => {
        document.documentElement.innerHTML=html.toString();
    });
    afterEach(() => {
        jest.resetModules();
    });

    it("You should not change or delete the existing elements in the <head> tag", function () {
        let meta1 = document.querySelector("head").innerHTML.toString().indexOf("<meta c");
        let meta2 = document.querySelector("head").innerHTML.toString().indexOf("<meta n");
        let title = document.querySelector("head").querySelector("title");
        let tailwindScript = document.querySelector("head").innerHTML.toString().indexOf(`<script src="https://cdn.tailwindcss.com"></script>`);

        expect(meta1).not.toBe(-1);
        expect(meta2).not.toBe(-1);
        expect(title).toBeTruthy();
        expect(tailwindScript > -1).toBeTruthy();
    });

    it("You should not use the <style> tag", function () {
        let style = document.querySelector("style");
        expect(style).toBe(null);
    });

    it("Do not use any inline styles, only use Tailwind classes for styling", function () {
        expect(html.toString().match(/style(\s*)=(\s*)["']/)).toBeFalsy();
    });

    it("You should use a main w-full container", function () {
        let div = document.querySelector("div");
        expect(div).toBeTruthy();
        expect(div.classList.contains("w-full")).toBeTruthy();
    });

    it("You should have a flex row inside the main container", function () {
        let row = document.querySelector(".w-full").querySelector(".flex");
        expect(row).toBeTruthy();
    });

    it("The row should contain 2 columns with the same width", function () {
        let cols = document.querySelector(".w-full").querySelector(".flex").querySelectorAll("div");
        expect(cols[0].classList.contains("w-1/2") || cols[0].classList.contains("w-1\\/2")).toBeTruthy();
        expect(cols[1].classList.contains("w-1/2") || cols[1].classList.contains("w-1\\/2")).toBeTruthy();
    });

    it("The first element should be an <h5> tag", function () {
        let col = document.querySelector(".w-full").querySelector(".flex").querySelectorAll("div")[0];
        expect(col.children[0].nodeName).toBe("H5");
    });

    it("The second element should be a paragraph", function () {
        let col = document.querySelector(".w-full").querySelector(".flex").querySelectorAll("div")[0];
        expect(col.children[1].nodeName).toBe("P");
    });

    it("The next two elements should be 2 buttons", function () {
        let colChildren = document.querySelector(".w-full").querySelector(".flex").querySelectorAll("div")[0].children;
        expect(colChildren[2].nodeName).toBe("BUTTON");
        expect(colChildren[3].nodeName).toBe("BUTTON");
        expect(colChildren[2].classList.contains("bg-green-600")).toBeTruthy();
        expect(colChildren[3].classList.contains("bg-red-600")).toBeTruthy();
    });

    it("The first element of the right column should be an alert-like block", function () {
        let col = document.querySelector(".w-full").querySelector(".flex").querySelectorAll("div")[1].children;

        expect(col[0].nodeName).toBe("DIV");
        expect(col[0].classList.contains("bg-yellow-100")).toBeTruthy();
    });

    it("The second element should be a <table>", function () {
        let col = document.querySelector(".w-full").querySelector(".flex").querySelectorAll("div")[1].children;

        expect(col[1].nodeName).toBe("TABLE");
        expect(col[1].classList.contains("w-full")).toBeTruthy();
    });

    it("The <table> should contain 3 columns and 3 body rows", function () {
        let table=document.querySelector("table").children;

        expect(table.length).toBe(2);
        expect(table[0].nodeName).toBe("THEAD");
        expect(table[1].nodeName).toBe("TBODY");
        expect(table[1].children[0].children.length).toBe(3);
        expect(table[1].children[1].children.length).toBe(3);
        expect(table[1].children[2].children.length).toBe(3);
    });
});
