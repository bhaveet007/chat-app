'use strict'

const DEFAULT_OPTIONS = {
  projection: '',
  populate: '',
  sort: { _id: 1 },
  filterProps: []
}

export default function mongoSchemaWrapper (Schema, options = {}) {
  const _options = { ...DEFAULT_OPTIONS, ...options }

  Schema._options = _options
}
