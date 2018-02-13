package main

import (
	"github.com/stretchr/goweb"
	"github.com/stretchr/goweb/context"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"time"
)

const (
	Address string = ":7070"
)

var absPath, _ = filepath.Abs(os.Args[0])
var serverDir string = "/home/jesse/Projects/6xbook/src/client/public"

func mapRoutes() {
	goweb.MapBefore(func(c context.Context) error {
		c.HttpResponseWriter().Header().Set("X-Custom-Header", "Goweb")
		return nil
	})

	goweb.MapAfter(func(c context.Context) error {
		// TODO
		return nil
	})

	goweb.Map("/days/", func(c context.Context) error {
		c.HttpResponseWriter().Header().Set("Content-Type", "application/json")
		return goweb.Respond.With(c, 200, []byte("[\"7\", \"8\", \"9\"]"))
	})
	goweb.MapStaticFile("/", filepath.Join(serverDir, "index.html"))
	goweb.MapStaticFile("/bundle.js", filepath.Join(serverDir, "bundle.js"))
	goweb.MapStatic("/css", filepath.Join(serverDir, "css"))
}

func main() {
	mapRoutes()

	log.Print("Goweb 2")

	s := &http.Server{
		Addr:           Address,
		Handler:        goweb.DefaultHttpHandler(),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	listener, _ := net.Listen("tcp", Address)

	go func() {
		for _ = range c {
			log.Print("Stopping the server ...")
			listener.Close()
			log.Fatal("Finished ...")
		}
	}()

	log.Fatalf("Error in Serve: %s", s.Serve(listener))
}
