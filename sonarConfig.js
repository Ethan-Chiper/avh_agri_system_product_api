const SonarQubeScanner = require('sonarqube-scanner');

SonarQubeScanner(
	{
		serverUrl: 'http://localhost:9000/',
		options: {
			'sonar.projectDescription': 'This is a Node JS application',
			'sonar.projectName': 'ippopay_helth_insurance_api',
			'sonar.projectKey': 'ippopay_helth_insurance_api',
			'sonar.token': 'sqp_6d88c06a5bf7cab499100f88a423aa382f335f27',
			'sonar.projectVersion': '3.0',
			'sonar.language': 'js',
			'sonar.sourceEncoding': 'utf8',
			'sonar.sources': '.',
			'sonar.java.binaries': '**/*.java'
		}
	},
	() => {}
);
