export default interface IProgram {
  name: string,
  text: string,
  children?: Array<IProgram>,
}
