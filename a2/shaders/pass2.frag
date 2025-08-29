// Pass 2 fragment shader
//
// Outputs the Laplacian, computed from depth buffer

#version 300 es

// texCoordInc = the x and y differences, in texture coordinates,
// between one texel and the next.  For a window that is 400x300, for
// example, texCoordInc would be (1/400,1/300).

uniform mediump vec2 texCoordInc;

// texCoords = the texture coordinates at this fragment

in mediump vec2 texCoords;

// depthSampler = texture sampler for the depths.

uniform mediump sampler2D depthSampler;

// fragLaplacian = an RGB value that is output from this shader.  All
// three components should be identical.  This RGB value will be
// stored in the Laplacian texture.

layout (location = 0) out mediump vec3 fragLaplacian;


void main()

{
  // YOUR CODE HERE.  You will have to compute the Laplacian by
  // evaluating a 3x3 filter kernel at the current texture
  // coordinates.  The Laplacian weights of the 3x3 kernel are
  //
  //      -1  -1  -1
  //      -1   8  -1
  //      -1  -1  -1
  //
  // Store a signed value for the Laplacian; do not take its absolute
  // value.
   
const mediump float filerKernal[9] = float[](-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0);
mediump vec2 offsets[9] = vec2[](vec2(-texCoordInc.x, texCoordInc.y), vec2(0, texCoordInc.y), vec2(texCoordInc.x, texCoordInc.y), vec2(-texCoordInc.x, 0), vec2(0, 0), vec2(texCoordInc.x, 0), vec2(-texCoordInc.x, -texCoordInc.y), vec2(0, -texCoordInc.y), vec2(texCoordInc.x, -texCoordInc.y));

mediump float laplacian = 0.0;
for(int i =0; i <filerKernal.length(); i++){
    mediump vec2 coord = texCoords + offsets[i];
    mediump float depth = texture(depthSampler, coord).r;
    laplacian += depth * filerKernal[i];
}
fragLaplacian = vec3(laplacian);
}
