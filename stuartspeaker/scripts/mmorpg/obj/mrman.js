function mrman(gl, shader, texPath) {
  const xo = 512 / 1000;
  const yo = 512 / 200;
  // prettier-ignore
  const s = 1;
  const data = {
    verts: [
      -xo,
      1 + s,
      0,
      -xo,
      -yo - s,
      0,
      xo,
      -yo - s,
      0,
      -xo,
      1 + s,
      0,
      xo,
      -yo - s,
      0,
      xo,
      1 + s,
      0,
    ],
    uvs: [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    tex: "mrman",
    shader: "flatShader",
  };
  gl.useProgram(shader.program);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const pos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pos);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.verts), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(shader.attribs.pos);
  gl.vertexAttribPointer(shader.attribs.pos, 3, gl.FLOAT, false, 0, 0);

  const uvs = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvs);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.uvs), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(shader.attribs.uv);
  gl.vertexAttribPointer(shader.attribs.uv, 2, gl.FLOAT, false, 0, 0);

  gl.bindVertexArray(null);

  gl.activeTexture(gl.TEXTURE0);
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0])
  );
  const i = new Image();
  i.src = texPath;
  i.addEventListener("load", () => {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, i);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
  gl.uniform1i(shader.uniforms.tex, 0);

  return {
    verts: data.verts,
    shader,
    vao,
    buf: { pos, uvs },
    tex,
  };
}

export default mrman;
