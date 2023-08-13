export default interface IMenu {
  label: string
  path: string,
  link?: string,
  amount?: number,
  image?: string,
  children?: IMenu[],
}
