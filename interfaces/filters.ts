export default interface IFilters
  extends Record<
    string | number, string | number | boolean | null | Array<string | number | boolean>
  > {
}
