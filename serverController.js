const axios = require('axios');

module.exports = {
    characterByName: (req, res) => {
        const name = req.params.name;
        axios.get(`https://swapi.co/api/people/?search=${name}`)
            .then((character) => {
                res.render('resPage', { character: character.data.results[0] });
            })
    },

    getCharacters: (req, res) => {
        let paramType = '';
        const param = req.query.sort ? req.query.sort : '';
        let characters = []
        function sortCharacters(apiUrl) {
            (param === 'name' ? paramType = 'string' : paramType = 'number')
            axios.get(apiUrl)
                .then((response) => {
                    characters = characters.concat(response.data.results)
                    if (characters.length < 50) {
                        sortCharacters(response.data.next)
                    } else {
                        function sort(a, b) {
                            if (paramType === 'number') {
                                return (Number(a[param]) < Number(b[param]) ? -1 : 1)
                                return 0;
                            } else {
                                return (a[param] < b[param] ? -1 : 1)
                                return 0;
                            }
                        }
                        characters.sort(sort);
                        res.status(200).send(characters)
                    }
                })
        }
        sortCharacters(`https://swapi.co/api/people/`);
    },

    getPlanetResidents: (req, res, next) => {
        let residentsArr = []
        function resident(planetName, name) {
            this.planet = planetName;
            this.residents = name;
        }
        axios.get('https://swapi.co/api/planets/')
            .then((response) => {
                const datas = response.data.results;
                datas.map((planetName, i) => {
                    planetName.residents.map((residentName, j) => {
                        axios.get(residentName)
                    })
                    residentsArr.push(new resident(planetName.name, planetName.residents))
                })
                res.send(residentsArr);
            })
    }
}
