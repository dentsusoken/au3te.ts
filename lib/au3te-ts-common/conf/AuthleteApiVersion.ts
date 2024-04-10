enum AuthleteApiVersion {
  V2 = 'V2',
  V3 = 'V3',
}

function parse(version: string): AuthleteApiVersion | null {
  if (version === null) {
    return null;
  }

  try {
    // Parse the given string as AuthleteApiVersion. If the string
    // does not match any known version, valueOf() will throw an
    // IllegalArgumentException instance.
    return AuthleteApiVersion[version as keyof typeof AuthleteApiVersion];
  } catch (e) {
    // The given string did not match any known version.
    return null;
  }
}
