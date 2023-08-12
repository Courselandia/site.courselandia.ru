export default interface IMenu {
  label: string
  path: string,
  amount?: number,
  image?: string,
  children?: IMenu[],
}
