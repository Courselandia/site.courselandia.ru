export default interface IMenu {
  label: string
  link: string,
  children?: IMenu[],
}
