export default interface IMenu {
  label: string
  link: string,
  amount?: number,
  image?: string,
  children?: IMenu[],
}
