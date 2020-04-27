class Grafica {
  constructor(yo, letters, words) {
    this.labels = ["Letras", "Palabras"];
    this.datasets = [
      {
        label: yo,
        data: [letters, words, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ];
  }
}

export default Grafica;
