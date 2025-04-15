import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

// const Welcome = (props) => {
//   return (
//     <Grid
//       container
//       item
//       direction="column"
//       alignItems="center"
//       justify="center"
//       style={{ padding: "30px", minHeight: "93vh" }}
//     >
//       <Grid item>
//         <Typography variant="h2">Welcome to Job Portal</Typography>
//       </Grid>
//     </Grid>
//   );
// };

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

// export default Welcome;



// import React, { useEffect } from 'react';
// import { Chart } from 'chart.js/auto';




// const Welcome = () => {
//   useEffect(() => {
//     const signupButton = document.getElementById('signup-button');
    
//     if (signupButton) {
//       signupButton.addEventListener('click', () => {
//         alert('Redirection vers la page de création de compte (non implémentée).');
//       });
//     }

//     return () => {
//       if (signupButton) {
//         signupButton.removeEventListener('click', () => {});
//       }
//     };
//   }, []);

//   // const chartData = {
//   //   labels: ['Companies', 'Candidates', 'Jobs Posted', 'Applications'],
//   //   data: [12, 19, 3, 5],
//   //   backgroundColors: [
//   //     'rgba(255, 99, 132, 0.2)',
//   //     'rgba(54, 162, 235, 0.2)',
//   //     'rgba(255, 206, 86, 0.2)',
//   //     'rgba(75, 192, 192, 0.2)'
//   //   ],
//   //   borderColors: [
//   //     'rgba(255, 99, 132, 1)',
//   //     'rgba(54, 162, 235, 1)',
//   //     'rgba(255, 206, 86, 1)',
//   //     'rgba(75, 192, 192, 1)'
//   //   ]
//   // };

//   const placeholderSVG = (
//     <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
//       <rect width="100%" height="100%" fill="#eee"/>
//       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#aaa">Placeholder</text>
//     </svg>
//   );

//   return (
//     <div className="job-platform">
//       <style>{`
//         body {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           margin: 0;
//           padding: 0;
//           background: linear-gradient(to right, #e57373, #f44336);
//           color: #fff;
//           line-height: 1.7;
//           overflow-x: hidden;
//         }

//         header {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           color: #fff;
//           padding: 1rem 0;
//           text-align: center;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           position: relative;
//           overflow: hidden;
//           top: 0;
//           left: 0;
//           width: 100%;
//           z-index: 100;
//         }

//         header::before {
//           content: '';
//           position: absolute;
//           bottom: -50px;
//           left: 0;
//           right: 0;
//           background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,47.2,600,47.2c301.333,0,600-47.2,600-47.2V0h-1200V56.5z" fill="%23fff"/></svg>') repeat-x;
//           background-size: 1200px 100px;
//           width: 100%;
//           height: 100px;
//           animation: wave 10s linear infinite;
//           opacity: 0.4;
//         }

//         header::after {
//           content: '';
//           position: absolute;
//           bottom: -40px;
//           left: 0;
//           right: 0;
//           background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,47.2,600,47.2c301.333,0,600-47.2,600-47.2V0h-1200V56.5z" fill="%23fff"/></svg>') repeat-x;
//           background-size: 1800px 80px;
//           width: 100%;
//           height: 80px;
//           animation: wave 15s linear infinite;
//           opacity: 0.3;
//         }

//         @keyframes wave {
//           0% {
//               background-position-x: 0;
//           }
//           100% {
//               background-position-x: 1200px;
//           }
//         }

//         header h1 {
//           margin: 0;
//           font-size: 2rem;
//           letter-spacing: 1px;
//           text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//         }

//         header p {
//           font-size: 1.1rem;
//           margin-top: 0.5rem;
//           font-weight: 300;
//           text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
//         }

//         nav {
//           margin-top: 1rem;
//           display: flex;
//           justify-content: center;
//         }

//         nav a {
//           color: #fff;
//           text-decoration: none;
//           margin: 0 1rem;
//           font-size: 1rem;
//           font-weight: 400;
//           transition: color 0.3s ease, transform 0.3s ease;
//           padding: 0.4rem 0.8rem;
//           border-radius: 20px;
//         }

//         nav a:hover {
//           color: #f0f8ff;
//           transform: translateY(-2px);
//           background-color: rgba(255, 255, 255, 0.15);
//         }

//         section {
//           padding: 3rem 2rem;
//           margin: 2rem auto;
//           background-color: rgba(255, 255, 255, 0.8);
//           border-radius: 12px;
//           box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
//           max-width: 1200px;
//           color: #343a40;
//           margin-top: 0rem;
//         }

//         #hero {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 2rem;
//           align-items: center;
//           padding: 5rem 2rem;
//         }

//         .hero-content {
//           padding: 1rem;
//         }

//         .hero-content h2 {
//           font-size: 2.8rem;
//           margin-bottom: 1.3rem;
//           color: #f44336;
//           text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
//         }

//         .hero-content p {
//           font-size: 1.3rem;
//           color: #495057;
//         }

//         .hero-image {
//           text-align: center;
//         }

//         .hero-image img {
//           max-width: 100%;
//           height: auto;
//           border-radius: 12px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           transition: transform 0.4s ease;
//         }

//         .hero-image img:hover {
//           transform: scale(1.05);
//         }

//         .cta-button {
//           background-color: #fff;
//           color: #3f51b5;
//           padding: 1.2rem 2.5rem;
//           text-decoration: none;
//           border-radius: 30px;
//           display: inline-block;
//           margin-top: 2rem;
//           font-size: 1.2rem;
//           font-weight: 500;
//           transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           border: 2px solid #3f51b5;
//         }

//         .cta-button:hover {
//           background-color: #3f51b5;
//           color: #fff;
//           transform: translateY(-3px);
//           box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
//         }

//         #entreprises ul, #candidats ul {
//           list-style: none;
//           padding-left: 0;
//           font-size: 1.2rem;
//           color: #555;
//         }

//         #entreprises ul li, #candidats ul li {
//           margin-bottom: 0.8rem;
//           padding-left: 1.5rem;
//           position: relative;
//         }

//         #entreprises ul li::before, #candidats ul li::before {
//           content: '✓';
//           position: absolute;
//           left: 0;
//           top: 2px;
//           color: #f50057;
//         }

//         #avantages {
//           text-align: center;
//         }

//         #avantages h2 {
//           font-size: 2.8rem;
//           color: #f50057;
//           margin-bottom: 2rem;
//           text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
//         }

//         .avantages-container {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 2.5rem;
//           margin-top: 3rem;
//         }

//         .avantage {
//           padding: 2rem;
//           border: 1px solid rgba(0, 0, 0, 0.1);
//           border-radius: 12px;
//           text-align: center;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           background-color: #fff;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }

//         .avantage:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
//         }

//         .avantage img {
//           max-width: 70%;
//           height: auto;
//           margin-bottom: 1.3rem;
//         }

//         .avantage h3 {
//           font-size: 1.6rem;
//           color: #f50057;
//           margin-bottom: 0.7rem;
//         }

//         #contact {
//           text-align: center;
//         }

//         #contact h2 {
//           font-size: 2.8rem;
//           color: #f50057;
//           margin-bottom: 2rem;
//           text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
//         }

//         #contact form {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 1.5rem;
//           max-width: 700px;
//           margin: 0 auto;
//           padding: 3rem;
//           background-color: rgba(255, 255, 255, 0.9);
//           border-radius: 12px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }

//         #contact input, #contact textarea {
//           padding: 1.3rem;
//           border: 1px solid #ced4da;
//           border-radius: 8px;
//           font-size: 1.1rem;
//           transition: border-color 0.3s ease;
//         }

//         #contact input:focus, #contact textarea:focus {
//           border-color: #f50057;
//           outline: none;
//           box-shadow: 0 0 5px rgba(244, 67, 54, 0.3);
//         }

//         #contact button {
//           background-color: #fff;
//           color: #3f51b5;
//           padding: 1.3rem 2.5rem;
//           border: none;
//           border: 2px solid #3f51b5;
//           border-radius: 30px;
//           cursor: pointer;
//           font-size: 1.2rem;
//           font-weight: 500;
//           transition: background-color 0.3s ease, transform 0.3s ease;
//         }

//         #contact button:hover {
//           background-color: #3f51b5;
//           transform: translateY(-2px);
//           color: #fff;
//         }

//         footer {
//           background-color: #343a40;
//           color: #fff;
//           text-align: center;
//           padding: 2rem 0;
//           font-size: 1.1rem;
//         }

//         @media (max-width: 768px) {
//           header h1 {
//               font-size: 2.5rem;
//           }

//           header p {
//               font-size: 1.2rem;
//           }

//           nav a {
//               margin: 0 0.8rem;
//               font-size: 1.1rem;
//           }

//           #hero {
//               grid-template-columns: 1fr;
//               text-align: center;
//           }

//           .hero-image {
//               order: -1;
//           }

//           .hero-content h2 {
//               font-size: 2.4rem;
//           }

//           .avantages-container {
//               grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           }
//         }
//       `}</style>

//       <header>
//         <h1>Bienvenue sur Notre Plateforme d'Emploi</h1>
//         <p>La solution idéale pour connecter entreprises et candidats.</p>
//         <nav>
//           <a href="#entreprises">Entreprises</a>
//           <a href="#candidats">Candidats</a>
//           <a href="#avantages">Avantages</a>
//           <a href="#contact">Contact</a>
//         </nav>
//       </header>

//       <section id="hero">
//         <div className="hero-content">
//           <h2>Trouvez le Match Parfait</h2>
//           <p>Nous simplifions votre recherche d'emploi ou de candidat idéal. Rejoignez notre communauté dès aujourd'hui !</p>
//           <a href="#" className="cta-button" id="signup-button">Créer un compte</a>
//         </div>
//         <div className="hero-image">
//           {placeholderSVG}
//         </div>
//       </section>

//       <section id="entreprises">
//         <h2>Vous êtes une entreprise ?</h2>
//         <p>Trouvez rapidement des employés qualifiés grâce à notre plateforme intuitive.</p>
//         <ul>
//           <li>Accès à un large vivier de talents</li>
//           <li>Outils de recherche avancés</li>
//           <li>Gestion simplifiée des candidatures</li>
//         </ul>
//         <a href="#" className="cta-button">Déposer une offre d'emploi</a>
//       </section>

//       <section id="candidats">
//         <h2>Vous êtes un candidat ?</h2>
//         <p>Découvrez des offres d'emploi qui correspondent à vos compétences et ambitions.</p>
//         <ul>
//           <li>Recherche d'emploi personnalisée</li>
//           <li>Alertes emploi en temps réel</li>
//           <li>Suivi de vos candidatures</li>
//         </ul>
//         <a href="#" className="cta-button">Explorer les offres d'emploi</a>
//       </section>

//       <section id="avantages">
//         <h2>Pourquoi choisir notre plateforme ?</h2>
//         <div className="avantages-container">
//           <div className="avantage">
//             {placeholderSVG}
//             <h3>Gain de temps</h3>
//             <p>Trouvez rapidement ce que vous cherchez.</p>
//           </div>
//           <div className="avantage">
//             {placeholderSVG}
//             <h3>Facilité d'utilisation</h3>
//             <p>Une interface simple et intuitive.</p>
//           </div>
//           <div className="avantage">
//             {placeholderSVG}
//             <h3>Support dédié</h3>
//             <p>Une équipe à votre écoute pour vous accompagner.</p>
//           </div>
//         </div>
//       </section>

//       <section id="contact">
//         <h2>Contactez-nous</h2>
//         <p>Pour toute question, n'hésitez pas à nous contacter.</p>
//         <form>
//           <input type="text" placeholder="Votre nom" />
//           <input type="email" placeholder="Votre email" />
//           <textarea placeholder="Votre message"></textarea>
//           <button type="submit">Envoyer</button>
//         </form>
//       </section>

//       <footer>
//         <p>&copy; 2024 Plateforme d'Emploi</p>
//       </footer>
//     </div>
//   );
// };

// export default Welcome;



const Welcome = () => {
  useEffect(() => {
    const signupButton = document.getElementById('signup-button');
    
    if (signupButton) {
      signupButton.addEventListener('click', () => {
        alert('Redirection vers la page de création de compte (non implémentée).');
      });
    }

    return () => {
      if (signupButton) {
        signupButton.removeEventListener('click', () => {});
      }
    };
  }, []);

  const placeholderSVG = (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#eee"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#aaa">Placeholder</text>
    </svg>
  );

  let history = useHistory();
  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  return (
   <div>
     <div className="job-platform">
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(to right, #e57373, #f44336);
          color: #fff;
          line-height: 1.7;
          overflow-x: hidden;
        }

        header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: #fff;
          padding: 1rem 0;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
        }

        // header::before {
        //   content: '';
        //   position: absolute;
        //   bottom: -50px;
        //   left: 0;
        //   right: 0;
        //   background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,47.2,600,47.2c301.333,0,600-47.2,600-47.2V0h-1200V56.5z" fill="%23fff"/></svg>') repeat-x;
        //   background-size: 1200px 100px;
        //   width: 100%;
        //   height: 100px;
        //   animation: wave 10s linear infinite;
        //   opacity: 0.4;
        // }

        // header::after {
        //   content: '';
        //   position: absolute;
        //   bottom: -40px;
        //   left: 0;
        //   right: 0;
        //   background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,47.2,600,47.2c301.333,0,600-47.2,600-47.2V0h-1200V56.5z" fill="%23fff"/></svg>') repeat-x;
        //   background-size: 1800px 80px;
        //   width: 100%;
        //   height: 80px;
        //   animation: wave 15s linear infinite;
        //   opacity: 0.3;
        // }

        @keyframes wave {
          0% {
              background-position-x: 0;
          }
          100% {
              background-position-x: 1200px;
          }
        }

        header h1 {
          margin: 0;
          font-size: 2rem;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        header p {
          font-size: 1.1rem;
          margin-top: 0.5rem;
          font-weight: 300;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        nav {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
        }

        nav a {
          color: #fff;
          text-decoration: none;
          margin: 0 1rem;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.3s ease, transform 0.3s ease;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
        }

        nav a:hover {
          color: #f0f8ff;
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.15);
        }

        section {
          padding: 3rem 2rem;
          margin: 2rem auto;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          max-width: 1200px;
          color: #343a40;
          margin-top: 0rem;
        }

        #hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          padding: 5rem 2rem;
        }

        .hero-content {
          padding: 1rem;
        }

        .hero-content h2 {
          font-size: 2.8rem;
          margin-bottom: 1.3rem;
          color: #f44336;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .hero-content p {
          font-size: 1.3rem;
          color: #495057;
        }

        .hero-image {
          text-align: center;
        }

        .hero-image img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s ease;
        }

        .hero-image img:hover {
          transform: scale(1.05);
        }

        .cta-button {
          background-color: #fff;
          color: #3f51b5;
          padding: 1.2rem 2.5rem;
          text-decoration: none;
          border-radius: 30px;
          display: inline-block;
          margin-top: 2rem;
          font-size: 1.2rem;
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 2px solid #3f51b5;
        }

        .cta-button:hover {
          background-color: #3f51b5;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        }

        #candidats ul {
          list-style: none;
          padding-left: 0;
          font-size: 1.2rem;
          color: #555;
        }

        #candidats ul li {
          margin-bottom: 0.8rem;
          padding-left: 1.5rem;
          position: relative;
        }

        #candidats ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 2px;
          color: #f50057;
        }

        #avantages {
          text-align: center;
        }

        #avantages h2 {
          font-size: 2.8rem;
          color: #f50057;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .avantages-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .avantage {
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .avantage:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .avantage img {
          max-width: 70%;
          height: auto;
          margin-bottom: 1.3rem;
        }

        .avantage h3 {
          font-size: 1.6rem;
          color: #f50057;
          margin-bottom: 0.7rem;
        }

        #contact {
          text-align: center;
        }

        #contact h2 {
          font-size: 2.8rem;
          color: #f50057;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        #contact form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 700px;
          margin: 0 auto;
          padding: 3rem;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        #contact input, #contact textarea {
          padding: 1.3rem;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 1.1rem;
          transition: border-color 0.3s ease;
        }

        #contact input:focus, #contact textarea:focus {
          border-color: #f50057;
          outline: none;
          box-shadow: 0 0 5px rgba(244, 67, 54, 0.3);
        }

        #contact button {
          background-color: #fff;
          color: #3f51b5;
          padding: 1.3rem 2.5rem;
          border: none;
          border: 2px solid #3f51b5;
          border-radius: 30px;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        #contact button:hover {
          background-color: #3f51b5;
          transform: translateY(-2px);
          color: #fff;
        }

        #entreprises {
          // text-align: center;
          margin-bottom: 2rem;
        }

        #entreprises h2 {
          font-size: 2.8rem;
          color: #f50057;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        #entreprises ul {
          list-style: none;
          padding-left: 0;
          font-size: 1.2rem;
          color: #555;
        }

        #entreprises ul li {
          margin-bottom: 0.8rem;
          padding-left: 1.5rem;
          position: relative;
        }

        #entreprises ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 2px;
          color: #f50057;
        }

        footer {
          background-color: #004aad;
          color: #fff;
          text-align: center;
          padding: 2rem 0;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          header h1 {
              font-size: 2.5rem;
          }

          header p {
              font-size: 1.2rem;
          }

          nav a {
              margin: 0 0.8rem;
              font-size: 1.1rem;
          }

          #hero {
              grid-template-columns: 1fr;
              text-align: center;
          }

          .hero-image {
              order: -1;
          }

          .hero-content h2 {
              font-size: 2.4rem;
          }

          .avantages-container {
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
      `}</style>

      {/* <header style={{ height:"100vh", marginTop:"100px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>Bienvenue sur Notre Plateforme d'Emploi</h1>
          <p>La solution idéale pour connecter entreprises et candidats.</p>
        </div>
        {/* <nav>
          <a href="#candidats">Candidats</a>
          <a href="#avantages">Avantages</a>
          <a href="#contact">Contact</a>
          <a href="#entreprises">Entreprises</a>
        </nav> */}
        {/* <img src='/header.png' alt=''/> */}
      {/* </header> */} 
      <section
  style={{
  //   height: "100vh",
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  //   padding: "0 3%",
  //   gap: "10px", // Réduction de l’espace entre le texte et l’image
  }}
 >
  {/* Section Texte */}
  <div style={{ maxWidth: "650px" }}>
    <h1 style={{ fontSize: "3rem", color: "#3b7ccd", marginBottom: "15px" }}>
      Bienvenue sur Notre Plateforme d'Emploi
    </h1>
    <p style={{ fontSize: "1.2rem", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", lineHeight: "1.5" }}>
      La solution idéale pour connecter entreprises et candidats.
    </p>
  </div>

  {/* Image */}
  <img
    src="/header.png"
    alt="Illustration"
    style={{ maxWidth: "600px", height: "auto", borderRadius: "10px" }}
  />
</section>


      <section id="hero">
        <div className="hero-content">
          <h2>Trouvez le Match Parfait</h2>
          <p>Nous simplifions votre recherche d'emploi ou de candidat idéal. Rejoignez notre communauté dès aujourd'hui !</p>
          <a href="/signup" className="cta-button" id="signup-button">Créer un compte</a>
        </div>
        <div className="hero-image">
        <img  src='/match.png' alt='' style={{ maxWidth:"250px" }}/>

        </div>
      </section>


      <section id="avantages">
        <h2>Pourquoi choisir notre plateforme ?</h2>
        <div className="avantages-container">
          <div className="avantage">
            {/* {placeholderSVG} */}
            <img src='/temps.png' alt=''/>
            <h3>Gain de temps</h3>
            <p>Trouvez rapidement ce que vous cherchez.</p>
          </div>
          <div className="avantage">
            <img src='/interface.png' alt=''/>
            <h3>Facilité d'utilisation</h3>
            <p>Une interface simple et intuitive.</p>
          </div>
          <div className="avantage">
            <img src='/support.png' alt=''/>
            <h3>Support dédié</h3>
            <p>Une équipe à votre écoute pour vous accompagner.</p>
          </div>
        </div>
      </section>

      <section id="candidats">
        <h2>Vous êtes un candidat ?</h2>
        <p>Découvrez des offres d'emploi qui correspondent à vos compétences et ambitions.</p>
        <ul>
          <li>Recherche d'emploi personnalisée</li>
          <li>Alertes emploi en temps réel</li>
          <li>Suivi de vos candidatures</li>
        </ul>
        <a href="/login" className="cta-button">Explorer les offres d'emploi</a>
      </section>



      <section id="entreprises">
        <h2>Vous êtes une entreprise ?</h2>
        <p>Trouvez rapidement des employés qualifiés grâce à notre plateforme intuitive.</p>
        <ul>
          <li>Accès à un large vivier de talents</li>
          <li>Outils de recherche avancés</li>
          <li>Gestion simplifiée des candidatures</li>
        </ul>
        <a href="/login" className="cta-button">Déposer une offre d'emploi</a>
      </section>


      <section id="contact">
        <h2>Contactez-nous</h2>
        <p>Pour toute question, n'hésitez pas à nous contacter.</p>
        <form>
          <input type="text" placeholder="Votre nom" />
          <input type="email" placeholder="Votre email" />
          <textarea placeholder="Votre message"></textarea>
          <button type="submit">Envoyer</button>
        </form>
      </section>

    </div>
      {/* <footer>
        <p>&copy; 2024 Plateforme d'Emploi</p>
      </footer> */}
   </div>
  );
};

export default Welcome;