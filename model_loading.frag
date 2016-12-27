#version 330 core

in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoords;

out vec4 color;

uniform sampler2D texture_diffuse1;
uniform vec3 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;  

void main() {
	
	// Ambient
    float ambientStrength = 0.1f;
    vec3 ambient = ambientStrength * lightColor;

	// Diffuse
	// We normalize the normal vector
	vec3 norm = normalize(Normal);
	// Calculate the direction vector between light source and the fragment's position
	vec3 lightDir = normalize(lightPos - FragPos);      
	// Calculate the diffuse impact, dot product between normal and light direction
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = diff * lightColor;

	// Specular
    // Specular
    float specularStrength = 0.5f;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    vec3 specular = specularStrength * spec * lightColor;  

	color = vec4(ambient + diffuse + specular, 1.0f) * texture(texture_diffuse1, TexCoords);
}