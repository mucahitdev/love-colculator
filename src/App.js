import './App.css';
import {useState} from "react";
import axios from "axios";


function App() {

  const [name, setName] = useState("");
  const [second, setSecond] = useState("");
  const [res, setres] = useState({});
  const [translate, setTranslate] = useState("");

  const cevir = (et ) => {
    var axios = require("axios").default;

    var options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'x-rapidapi-key': '7b2a2aeff8mshe03cc69a9261992p1b83c0jsnf7bdf0e94446'
      },
      data: {q: et, source: 'en', target: 'tr'}
    };
    
    axios.request(options).then(function (response) {
      setTranslate(response.data.data.translations.translatedText)
      console.log(response.data.data.translations);
    }).catch(function (error) {
      console.error(error);
    });
  }
 console.log(translate)


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const options = {
      method: 'GET',
      url: 'https://love-calculator.p.rapidapi.com/getPercentage',
      params: {sname: name.toLocaleUpperCase(), fname: second.toLocaleUpperCase()},
      headers: {
        'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
        'x-rapidapi-key': '7b2a2aeff8mshe03cc69a9261992p1b83c0jsnf7bdf0e94446'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setres(response.data)
      cevir(response.data.result)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const myClassNames = () => {
    if(res.percentage >=50 ) {
      return "card text-white bg-success me-auto ms-auto mt-5"
    }else {
      return "card text-white bg-danger me-auto ms-auto mt-5"
    }
  }
  

  




  return (
    <div className="App container text-center">

        <h1>Love Calculator </h1>

        <form className='col-8 me-auto ms-auto mt-5' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name1" className="form-label">1. Kişinin adı</label>
            <input type="text" className="form-control shadow-none" id="name1" value={name} onChange={(e) => setName(e.target.value)}/>
            <div id="name1" className="form-text">Sadece isim giriniz</div>
          </div>
          <div className="mb-3">
            <label htmlFor="name2" className="form-label">2. Kişinin adı</label>
            <input type="text" className="form-control shadow-none"  value={second} onChange={(e) => setSecond(e.target.value)}/>
          </div>
          <button className="btn btn-primary">Ölçüme başla</button>
        </form>
        
        <div className={myClassNames()} style={{display : translate==="" ? "none":"block" }}>
          <div className="card-header"> <b> { res.sname } </b> ve <b> { res.fname } </b> arasındaki ilişkinin gücü? </div>
          <div className="card-body">
            <h5 className="card-title">İlişki yüzdeniz : <b> %  { res.percentage } </b> </h5>
            <p className="card-text"> { res.result } ({translate}) </p>
          </div>
        </div>
        <div class="footer">Crated by <a href="https://github.com/mucahitkok">Mücahit Kökdemir</a> </div>
    </div>
  );
}

export default App;
