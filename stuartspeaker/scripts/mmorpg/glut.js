const createProgram = (gl, vss, fss) => {
  const p = gl.createProgram();
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vss);
  gl.compileShader(vs);
  console.log(gl.getShaderInfoLog(vs));

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fss);
  gl.compileShader(fs);
  console.log(gl.getShaderInfoLog(fs));

  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  console.log(gl.getProgramInfoLog(p));
  gl.useProgram(p);

  const attribs = [
    ...Array(gl.getProgramParameter(p, gl.ACTIVE_ATTRIBUTES))
  ].reduce((ac, el, i) => {
    const a = gl.getActiveAttrib(p, i);
    ac[a.name] = gl.getAttribLocation(p, a.name);
    return ac;
  }, {});

  const uniforms = [
    ...Array(gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS))
  ].reduce((ac, el, i) => {
    const a = gl.getActiveUniform(p, i);
    ac[a.name] = gl.getUniformLocation(p, a.name);
    return ac;
  }, {});

  return {
    program: p,
    attribs,
    uniforms
  };
};

export default {
  createProgram
};
