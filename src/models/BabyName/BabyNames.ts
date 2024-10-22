class BabyNames {
    constructor(
        public id: number,
        public year: number,
        public name: string,
        public gender: 'M' | 'F',
        public births: number,
        public position: number
    ) {}
}

export default BabyNames;