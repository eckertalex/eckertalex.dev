function kebabCase(str: string) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-')
}

function round(value: number) {
  return value.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')
}

export {kebabCase, round}
