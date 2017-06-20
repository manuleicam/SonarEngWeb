#!/usr/bin/ruby

require 'httpclient'
require 'json'
require 'rubygems'

class Cliente
	@cliente
	@acoustico
	@nome
	@password
	@idCliente

	def initialize(nome, password)
		@cliente = HTTPClient.new
		@acoustico = 1
		@nome = nome
		@password = password
	end

  	def readAco
    	@acoustico = rand(0..50)
  	end

	def iniciar
	  	logIN
	end

	def logIN
		flag = verificarLogIn
		if flag == 1
			@idCliente = getID
			@t1=Thread.new { lerSensor }
    		@t1.join
		end
	end

	def verificarLogIn
		verificarLogIn ={
			"nome" => @nome,
			"password" => @password
		}
		respJ = @cliente.get 'http://localhost:8888/sonar/scriptsSensores/verificarLogin.php', verificarLogIn
		puts respJ.body
		puts respJ.content
		res = JSON.parse(respJ.body)
		if res == "1" then
			return 0;
		else
			puts "Precisamos de nos registar primeiro"
			registar
			return 0;
		end
	end


  	def registar
  		flag = 0
  		flag = verificarNome
  		while flag != 1 do
  			puts "Nome já em uso, insira um novo nome para o sensor"
  			@nome = gets.chomp
  			puts "Novo nome: " + @nome
  			flag = verificarNome
  		end
  		
  		registar = {
  			"nome" => @nome,
  			"password" => @password
  			}
		res = @cliente.get 'http://localhost:8888/sonar/scriptsSensores/registar.php', registar
		puts res.body
	end

	def verificarNome
		verNome ={
			"nome" => @nome
		}
		resJ = @cliente.get 'http://localhost:8888/sonar/scriptsSensores/verificarNome.php', verNome
		res = JSON.parse(resJ.body)
		if res == "1" 
			return 0
		else 
			return 1	
		end

	end

##while true do
#	res = client.post 'http://localhost:8888/web/teste.php?name=Jan';
#	puts res.body;
#	sleep(5);
end
