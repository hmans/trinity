import { StringIndexable } from "../types"

/**
 * Convenience method for setting (potentially nested) properties on an object.
 */
export const applyProps = (object: StringIndexable, props: StringIndexable) => {
  for (const key in props) {
    const value = props[key]

    /* If the key contains a hyphen, we're setting a sub property. */
    if (key.indexOf("-") > -1) {
      const [property, ...rest] = key.split("-")
      applyProps(object[property], { [rest.join("-")]: value })
    } else if (object[key]) {
      if (object[key].setScalar && typeof value === "number") {
        object[key].setScalar(value)
      } else if (object[key].set) {
        Array.isArray(value) ? object[key].set(...value) : object[key].set(value)
      } else {
        object[key] = value
      }
    }
  }
}
