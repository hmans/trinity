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
    } else {
      /* If the property has a .set function, use that. Otherwise, just assign it directly. */
      if (object[key]?.set) {
        if (Array.isArray(value)) {
          /* If the value is an array, feed its destructured representation to the set method. */
          object[key].set(...value)
        } else if (key === "scale" && typeof value === "number") {
          /* A bit of special handling for "scale" properties, where we'll also accept a single numerical value */
          object[key].set(value, value, value)
        } else {
          /* Otherwise, we'll just directly assign whatever value was passed. */
          object[key].set(value)
        }
      } else {
        object[key] = value
      }
    }
  }
}
