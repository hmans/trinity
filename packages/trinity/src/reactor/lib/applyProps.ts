import { IStringIndexable } from "../types"

/**
 * Convenience method for setting (potentially nested) properties on an object.
 */
export const applyProps = (
  object: IStringIndexable,
  props: IStringIndexable
) => {
  for (const key in props) {
    const value = props[key]

    /* If the key contains a hyphen, we're setting a sub property. */
    if (key.indexOf("-") > -1) {
      const [property, ...rest] = key.split("-")
      applyProps(object[property], { [rest.join("-")]: value })
      continue
    }

    /* Use setScalar if available */
    if (object[key]?.setScalar && typeof value === "number") {
      object[key].setScalar(value)
      continue
    }

    /* Use copy if available */
    if (object[key]?.copy && object[key].constructor === value.constructor) {
      object[key].copy(value)
      continue
    }

    /* Use set if available */
    if (object[key]?.set) {
      Array.isArray(value) ? object[key].set(...value) : object[key].set(value)
      continue
    }

    /* Otherwise, just directly assign the property. */
    if (key in object) {
      object[key] = value
    }
  }
}
