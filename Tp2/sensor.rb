#!/usr/bin/ruby

require 'httpclient'
require 'json'
require 'rubygems'

class Cliente
	@cliente
	@acoustico
	@nome
	@password
	@flag
	@t1
	@idCliente

	def initialize(nome, password)
		@cliente = HTTPClient.new
		@acoustico = 1
		@nome = nome
		@password = password
		@flag = true
	end

  	def readAco
    	@acoustico = rand(0..50)
  	end

  	def enviarValores
  		@t1=Thread.new { lerSensor }
    	@t1.join
  	end

  	def lerSensor
  		@t2 = Thread.new {
  		while @flag do
  			readAco
	  		valor = {
	  			"valor" => @acoustico,
	  			"id" => @idCliente
	  		}
	  		respJ = @cliente.post 'http://localhost:8888/sonar/scriptsSensores/postValues.php', valor
	  		sleep(5);
	  	end
	  }
  	end

  	def disconnect
  		@flag = false
  		puts "Sensor desligado"
  		Thread.exit
  	end

	def iniciar
	  	logIN
	end

	def logIN
		verificarLogIn
	end

	def verificarLogIn
		verificarLogIn ={
			"nome" => @nome,
			"password" => @password
		}
		respJ = @cliente.get 'http://localhost:8888/sonar/scriptsSensores/verificarLogin.php', verificarLogIn
		res = JSON.parse(respJ.body)
		if res.to_i != 0 && res.to_i != -1 then
			puts "Log in com sucesso"
			@idCliente = res.to_i
			puts "O seu id é #{@idCliente}"
			enviarValores
		elsif res.to_s == "-1" then
			puts "Password errada"
			puts "Insira uma password nova"
			@password = gets.chomp
			verificarLogIn
		else
			puts "Não está registado, visite o site para se registar"
			#registar
		end
	end


  	#def registar
  	#	 		
  	#	registar = {
  	#		"nome" => @nome,
  	#		"password" => @password
  	#		}
	#	res = @cliente.get 'http://localhost:8888/sonar/scriptsSensores/registar.php', registar
	##	gpsX = gets.chomp
	#	puts "Insira o GPSY"
	#	gpsY = gets.chomp
	#
	#
	#end


end
