import Typograf from "typograf";
import $ from "jquery";

export function textHandler() {
    
    Typograf.addRule({
        name: "common/other/typographicSmallerNames",
        handler: function (text) {
            return text.replace(/([А-ЯЁ]\.)\s+([А-ЯЁ]\.)/g, "$1&nbsp;$2");
        },
    });
    Typograf.addRule({
        name: "common/other/typographicSmallNames",
        handler: function (text) {
            return text.replace(/([А-ЯЁ][а-яё]{0,2}\.)\s+([А-ЯЁ]\.)\s+([А-Я][а-я]+)/g, "$1&nbsp;$2&nbsp;$3");
        },
    });
    Typograf.addRule({
        name: "ru/dash/withNbsp",
        index: "-1", // Важно выполнять после других правил тире
        handler(text) {
            // Заменяем " - " на "&nbsp;—&nbsp;"
            return text.replace(/(\s)-(\s)/g, "$1&nbsp;&mdash; $2");
        },
    });
    Typograf.prototype.addCustomRule = function (rule) {
        this._rules = this._rules || [];
        this._rules.push(rule);
    };

    Typograf.addRule({
        name: "common/other/skipUnbalancedQuotesOnly",
        handler: function (text) {
            // Считаем количество открывающих и закрывающих кавычек-ёлочек
            const openCount = (text.match(/«/g) || []).length;
            const closeCount = (text.match(/»/g) || []).length;

            // // Если кавычек нет или они сбалансированы — оставляем текст как есть
            if (openCount === closeCount) {
                return text;
            }

            if ((text.match(/"([^„"„]+)"/g) || []).length) {
                return text.replace(/"([^"„"„]+)"/g, "«$1»");
            }
            text = text.replace(/"([^"„"„]+)"/g, "«$1»");

            // Шаг 2: Возвращаем немецкие кавычки, если они были внутри заменённых
            // text = text.replace(/«([^»]*)„([^»]*)"([^»]*)»/g, '«$1„$2" $3»');
            // Если баланс нарушен — тоже оставляем без изменений
            // (или можно вывести предупреждение в консоль)
            console.warn("Обнаружены несбалансированные кавычки-ёлочки:", text);
            return text;
        },
    });
    const tp = new Typograf({ locale: ["ru", "en-US"] });
    tp.setSetting("common/punctuation/quote", "ru", {
        left: "«",
        right: "»",
        removeDuplicateQuotes: true,
    });
    tp.disableRule("common/punctuation/quote");
    tp.disableRule("ru/other/phone-number");
    var elems = document.querySelectorAll("h1,h2,h3,h4,a,h6,p,li,b");
    for (let elem of elems) {
        elem.innerHTML = tp.execute(elem.innerHTML);
    }
}
export function splitTitles(){
	const titles = document.querySelectorAll(".h1, .h2, .h3");

	for (let h of titles) {
        if (h.classList.contains('is-splitted')) continue;
		const rows = h.innerHTML.trim().split("<br>");
		const text = h.textContent.trim().split(" ");

		h.textContent = "";
		for (let j = 0; j < rows.length; j++) {
			const text = rows[j].split(" ");

			for (let i = 0; i < text.length; i++) {
				const container = $('<span class="title-anim-container"></span>');
				const word =
					i === text.length - 1
						? $('<span class="title-anim-content">' + text[i] + "</span>")
						: $('<span class="title-anim-content">' + text[i] + "&nbsp;</span>");

				$(word).appendTo(container);
				$(container).appendTo(h);
			}
			$("<br>").appendTo(h);
		}
	}
}