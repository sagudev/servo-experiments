function Http() {}

Http.get = function(url, cb) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.addEventListener('load', (evt) => {cb(req.response);});
    req.open('GET', url);
    req.send();
};


window.addEventListener('load', function() {
    Http.get('experiments.json', function(data) {
        addExperiments(document.querySelector('#featured-experiments .experiment-previews'), data.featured, true);
        addExperiments(document.querySelector('#other-experiments .experiment-previews'), data.experiments);
        addExperiments(document.querySelector('#technical-tests .experiment-previews'), data.tests);
    });

    var tagWrap = function(tagName, el) {
        var tagEl = document.createElement(tagName);
        tagEl.appendChild(el);
        return tagEl;
    };

    var hrefWrap = function (el, href) {
        var a = tagWrap('a', el);
        a.href = href;
        return a;
        return a;
    };

    var pWrap = tagWrap.bind(null, 'p');

    function addExperiments(ul, experiments, showDesc) {
        var lis = experiments
            .map((info) => {
                var article = document.createElement('article');
                article.classList.add('experiment-preview');

                var h3 = document.createElement('h3');
                h3.textContent = info.name;
                article.appendChild(hrefWrap(h3, info.href));

                var screen = document.createElement('img');
                screen.src = info.href + 'thumb.png';
                screen.width = 256;
                screen.height = 256;
                article.appendChild(hrefWrap(screen, info.href));

                if (showDesc) {
                    var desc = document.createElement('div');
                    desc.classList.add('experiment-desc');
                    if (info.desc.indexOf('<p>') === -1) { // No p tag detected, insert one.
                        desc.appendChild(pWrap(document.createTextNode(info.desc)));
                    } else {
                        // Otherwise just use HTML provided.
                        desc.innerHTML = info.desc;
                    }
                    article.appendChild(hrefWrap(desc, info.href));
                }

                return article;
            });

        lis.forEach((li, i) => {
                setTimeout(() => {
                    li.style.opacity = '1';
                }, 150 + ((i + 2) * 150));
            });

        // Add the preview elements to dom        
        lis.forEach((li) => ul.appendChild(li));
    }

    requestAnimationFrame(animate);
    function animate(t) {
        requestAnimationFrame(animate);

        TWEEN.update(t);
    }
});