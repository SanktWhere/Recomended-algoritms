'use strict';

class Claster {
  constructor(name) {
    this.name = name;
    this.people = [];
    this.vcentroid = {'a' : 0}
  }

  //Добавить вектор признаков к кластеру
  add(person) {
    this.people.push(person);
  }

  //Удалить вектор признаков из кластера
  remove(person_index) {
    this.people.splice(person_index, 1);
  }

  //Возвратить центр кластера
  get_people() {
    return this.people;
  }

  //Вычислить вектор центра по членам кластера
  calculate_centroid() {
    this.vcentroid = {};
    this.tcentroid = {};
    //Выполнить итерации с каждым вектором признаков
    for (let i = 0; i < this.people.length; i++) {
        for (let key in this.people[i]) {
            if (typeof this.tcentroid[key] === 'undefined') {
                this.tcentroid[key] = 0;
            }
            this.tcentroid[key] = +this.tcentroid[key] + +this.people[i][key];
        }  
    }

    //Вычислить среднее для центра 
    for (let key in this.tcentroid) {
        this.vcentroid[key] = this.tcentroid[key] / this.people.length;
    }
    console.log("%s vcentroid = %o", this.name, this.vcentroid);
  }

  //Вычисление геометрического расстояния
  calculate_gd(person) {
    let gd = 0.0;

    for (const key in person) {
      gd += (this.vcentroid[key] - person[key]) * (this.vcentroid[key] - person[key])
    }
    
    gd = Math.sqrt(gd);

    return gd;
  }
}

function kmeans() {
    //В данном примере вычисялеться среднне количество просмотров по статье
    //в данном случае работает в 5-мерном пространстве где координа одного из измерений центра кластера всегда 0 а координаты точки в одном из зимерений пространства значение из объекта
    let marc  = { 'linux' : '13', 'oss' :'10', 'cloud' : '6', 'java' : '0', 'agile' : '0' };
    let megan = { 'linux' : '3', 'oss' : '0', 'cloud' : '1', 'java' : '6', 'agile' : '7' };

    let elise = { 'linux' : '11', 'oss' : '0', 'cloud' : '9','java' : '0', 'agile' : '1' };
    let jill  = { 'linux' : '0', 'oss' : '3', 'cloud' : '0', 'java' : '9', 'agile' : '8' };
    
    let claster1 = new Claster('claster1');
    claster1.add(marc);
    claster1.add(megan);

    let claster2 = new Claster('claster2');
    claster2.add(elise);
    claster2.add(jill);

    let changed = true;

    while (changed) {
      changed = false;

      claster1.calculate_centroid();
      claster2.calculate_centroid();

      let people1 = claster1.get_people();
      let people2 = claster2.get_people();
      console.log("iteration people1 = %o", claster1.get_people());
      console.log("iteration people2 = %o", claster2.get_people());

      console.log("Проверка членов 1 кластера относительно 2");
      for (const key in people1) {
        console.log("people in claster 1 distance to claster 2", claster2.calculate_gd(people1[key]));
        console.log("people in claster 1 distance to claster 1", claster1.calculate_gd(people1[key]));
        if (claster2.calculate_gd(people1[key]) < claster1.calculate_gd(people1[key])) {
          console.log("Put from first to second");
          claster2.add(people1[key]);
          claster1.remove(key);
          changed = true;
        }
      }

      console.log("Проверка членов 2 кластера относительно 1");
      for (const key in people2) {
        console.log("people in claster 2 distance to claster 2", claster2.calculate_gd(people2[key]));
        console.log("people in claster 2 distance to claster 1", claster1.calculate_gd(people2[key]));
        if (claster1.calculate_gd(people2[key]) < claster2.calculate_gd(people2[key])) {
          console.log("Put from second to first");
          claster1.add(people2[key]);
          claster2.remove(key);
          changed = true;
        }
      }
    }

    console.log('result claster1: ', claster1.get_people());
    console.log('result claster2: ', claster2.get_people());
}

kmeans();
