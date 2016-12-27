#version 330 core

in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoords;

out vec4 color;

uniform sampler2D texture_diffuse1;
uniform vec3 lightColor;
uniform vec3 lightPos;  

void main() {
	
	// Ambient
    float ambientStrength = 0.5f;
    vec3 ambient = ambientStrength * lightColor;

	//Diffuse
	// We normalize the normal vector
	vec3 norm = normalize(Normal);
	// Calculate the direction vector between light source and the fragment's position
	vec3 lightDir = normalize(lightPos - FragPos);      
	// Calculate the diffuse impact, dot product between normal and light direction
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = diff * lightColor;
    
	color = vec4(ambient + diffuse,1.0f) * texture(texture_diffuse1, TexCoords);
	//color = vec4(texture(texture_diffuse1, TexCoords));
}