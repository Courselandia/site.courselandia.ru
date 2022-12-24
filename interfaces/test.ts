export default interface IMenuLink {
  name: string
  to: string;
}

const test: IMenuLink = {
  name: 'Список магазинов',
  to: '/stores',
};

console.dir(test);
